export const Loading = () => {
    return (
        <div className="w-full h-screen bg-slate-800 box-border flex items-center justify-center">
            <img
                src="/loading.png"
                alt="Loading"
                className="max-w-full max-h-full object-contain"
            />
        </div>
    );
}