import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading";
import { TableCustom } from "../../components/Table/TableCustom";
import { GetAllUsers } from "../../services/api/user/paginationUser";

export const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllUsers = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await GetAllUsers(currentPage, 8);

      setData(response.data);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      toast.error("Ocurrió un error al cargar los usuarios.");
      console.error(error.response.data.message ?? "Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers(page);
  }, [page]);

  const columns = [
    { header: "ID", accessor: "userId" },
    { header: "Email", accessor: "email" },
    {
      header: "Género",
      render: (user) => (user.genderId === 1 ? "Masculino" : "Femenino"),
    },
    {
      header: "Rol",
      render: (user) => (user.roleId === 1 ? "Admin" : "Usuario"),
    }
  ];


  return (
    <>
      {loading ? (
        <Loading />) : (
        <div className="p-4 h-full">
          <p className="text-black text-2xl md:text-3xl font-semibold mb-4 dark:text-white">Lista de usuarios</p>
          <TableCustom
            columns={columns}
            data={data}
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            emptyMessage="No se encontraron usuarios." />
        </div>
      )}
    </>
  );
};
