import { useFieldArray, useForm } from "react-hook-form"

interface ProjectsProps {
  updateResumeData: (data: object) => void
}

export default function Projects({ updateResumeData }: ProjectsProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projects: [{ name: "", description: "", technologies: "", url: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  })

  const onSubmit = (data) => {
    updateResumeData({ projects: data.projects })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Project {index + 1}</h3>

          <div>
            <label htmlFor={`projects.${index}.name`} className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id={`projects.${index}.name`}
              {...register(`projects.${index}.name`, { required: "Project name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.projects?.[index]?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.projects[index].name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`projects.${index}.description`} className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id={`projects.${index}.description`}
              {...register(`projects.${index}.description`, { required: "Project description is required" })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            {errors.projects?.[index]?.description && (
              <p className="mt-1 text-sm text-red-600">{errors.projects[index].description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`projects.${index}.technologies`} className="block text-sm font-medium text-gray-700">
              Technologies Used
            </label>
            <input
              type="text"
              id={`projects.${index}.technologies`}
              {...register(`projects.${index}.technologies`, { required: "Technologies are required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.projects?.[index]?.technologies && (
              <p className="mt-1 text-sm text-red-600">{errors.projects[index].technologies.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`projects.${index}.url`} className="block text-sm font-medium text-gray-700">
              Project URL (Optional)
            </label>
            <input
              type="url"
              id={`projects.${index}.url`}
              {...register(`projects.${index}.url`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Project
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", description: "", technologies: "", url: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Project
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

