import { useFieldArray, useForm } from "react-hook-form"

interface SkillsProps {
  updateResumeData: (data: object) => void
}

export default function Skills({ updateResumeData }: SkillsProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [{ name: "", level: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  })

  const onSubmit = (data) => {
    updateResumeData({ skills: data.skills })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <div className="flex space-x-4">
            <div className="flex-grow">
              <label htmlFor={`skills.${index}.name`} className="block text-sm font-medium text-gray-700">
                Skill Name
              </label>
              <input
                type="text"
                id={`skills.${index}.name`}
                {...register(`skills.${index}.name`, { required: "Skill name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.skills?.[index]?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.skills[index].name.message}</p>
              )}
            </div>
            <div className="flex-grow">
              <label htmlFor={`skills.${index}.level`} className="block text-sm font-medium text-gray-700">
                Skill Level
              </label>
              <select
                id={`skills.${index}.level`}
                {...register(`skills.${index}.level`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select level...</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Skill
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", level: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Skill
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

