import { useForm } from "react-hook-form"

interface FormattingProps {
  updateResumeData: (data: object) => void
}

export default function Formatting({ updateResumeData }: FormattingProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      template: "modern",
      fontSize: "12",
      fontFamily: "Arial",
      color: "#000000",
      sectionOrder: [
        "personalInfo",
        "summary",
        "workExperience",
        "education",
        "skills",
        "projects",
        "awards",
        "volunteerExperience",
        "publications",
        "languages",
      ],
    },
  })

  const onSubmit = (data) => {
    updateResumeData({ formatting: data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Resume Formatting</h2>

      <div>
        <label htmlFor="template" className="block text-sm font-medium text-gray-700">
          Template
        </label>
        <select
          id="template"
          {...register("template")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
          <option value="minimalist">Minimalist</option>
        </select>
      </div>

      <div>
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
          Font Size
        </label>
        <select
          id="fontSize"
          {...register("fontSize")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="14">14</option>
        </select>
      </div>

      <div>
        <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">
          Font Family
        </label>
        <select
          id="fontFamily"
          {...register("fontFamily")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Garamond">Garamond</option>
        </select>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Accent Color
        </label>
        <input
          type="color"
          id="color"
          {...register("color")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Section Order</label>
        <p className="text-sm text-gray-500 mb-2">Drag and drop to reorder sections</p>
        <ul className="space-y-2">
          {[
            "Personal Info",
            "Summary",
            "Work Experience",
            "Education",
            "Skills",
            "Projects",
            "Awards",
            "Volunteer Experience",
            "Publications",
            "Languages",
          ].map((section, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md cursor-move">
              {section}
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Formatting
      </button>
    </form>
  )
}

