import { useForm } from "react-hook-form"

interface SummaryProps {
  updateResumeData: (data: object) => void
}

export default function Summary({ updateResumeData }: SummaryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    updateResumeData({ summary: data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Summary/Objective</h2>

      <div>
        <label htmlFor="summaryType" className="block text-sm font-medium text-gray-700">
          Choose Summary or Objective
        </label>
        <select
          id="summaryType"
          {...register("summaryType", { required: "Please select summary or objective" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select...</option>
          <option value="summary">Summary</option>
          <option value="objective">Objective</option>
        </select>
        {errors.summaryType && <p className="mt-1 text-sm text-red-600">{errors.summaryType.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          {...register("content", {
            required: "Content is required",
            maxLength: { value: 500, message: "Content should not exceed 500 characters" },
          })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
        <p className="mt-1 text-sm text-gray-500">Maximum 500 characters</p>
      </div>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

