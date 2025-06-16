import {
  ClipboardDocumentIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const Modules = [
  {
    moduleId: 1,
    name: "Inicio",
    route: "",
    icon: () => <HomeIcon className="w-5 h-5" />,
  },
  {
    moduleId: 2,
    name: "Gestión de usuarios",
    route: "gestionUsuarios",
    icon: () => <UserGroupIcon className="w-5 h-5" />,
  },
  {
    moduleId: 3,
    name: "Gestión de encuesta",
    route: "gestionEncuesta",
    icon: () => <ClipboardDocumentIcon className="w-5 h-5" />,
  },
];

export const Answers = {
  vocationalSurveyId: 10,
  surveyAnswers: [
    {
      surveyQuestionId: 1,
      questionText:
        "Si tuvieras un día libre para hacer cualquier cosa, ¿qué harías?",
      answer: "Leer, pasear al aire libre y escuchar música.",
    },
    {
      surveyQuestionId: 2,
      questionText: "¿Qué cosas consideras que haces bien o con facilidad?",
      answer: "Resolver problemas y trabajar en equipo.",
    },
    {
      surveyQuestionId: 3,
      questionText: "¿Qué significa para ti tener éxito en la vida?",
      answer: "Lograr mis metas y sentirme realizado.",
    },
  ],
  careerRecommendations: [
    {
      careerRecommendationId: 1,
      careerName: "Ingeniería de sistemas",
      description: "Diseña y gestiona soluciones tecnológicas.",
    },
    {
      careerRecommendationId: 2,
      careerName: "Ingeniería de software",
      description: "Desarrolla programas y aplicaciones eficientes.",
    },
    {
      careerRecommendationId: 3,
      careerName: "Ingeniería industrial",
      description: "Optimiza procesos y mejora la productividad.",
    },
  ],
};

export const Careers = [
  { name: "Ingeniería de Sistemas", total: 30 },
  { name: "Ingeniería Industrial", total: 25 },
  { name: "Diseño Gráfico", total: 15 },
  { name: "Psicología", total: 10 },
  { name: "Administración", total: 20 },
];

export const users = {
  masculino: 30,
  femenino: 10,
};
