import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PhysicalExam = () => {
  const navigate = useNavigate();

  const examinations = [
    {
      title: "Neurological Examination",
      description: "Step-by-step guide to pediatric neurological examination",
      category: "System-based"
    },
    {
      title: "Developmental Assessment",
      description: "Milestones and examination techniques by age group",
      category: "Age-based"
    },
    {
      title: "Growth Assessment",
      description: "Anthropometric measurements and plotting",
      category: "General"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Physical Examination</h1>
      </div>

      <div className="p-4 space-y-4">
        {examinations.map((exam, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-lg mb-2">{exam.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{exam.description}</p>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {exam.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysicalExam;