import { useFieldArray, useForm } from "react-hook-form"

interface LanguagesProps {
  updateResumeData: (data: object) => void
}

export default function Languages({ updateResumeData }: LanguagesProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      languages: [{ language: "", proficiency: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  })

  const onSubmit = (data) => {
    updateResumeData({ languages: data.languages })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Languages</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Language {index + 1}</h3>

          <div>
            <label htmlFor={`languages.${index}.language`} className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <input
              type="text"
              id={`languages.${index}.language`}
              {...register(`languages.${index}.language`, { required: "Language is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.languages?.[index]?.language && (
              <p className="mt-1 text-sm text-red-600">{errors.languages[index].language.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`languages.${index}.proficiency`} className="block text-sm font-medium text-gray-700">
              Proficiency Level
            </label>
            <select
              id={`languages.${index}.proficiency`}
              {...register(`languages.${index}.proficiency`, { required: "Proficiency level is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select proficiency...</option>
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
            {errors.languages?.[index]?.proficiency && (
              <p className="mt-1 text-sm text-red-600">{errors.languages[index].proficiency.message}</p>
            )}
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Language
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ language: "", proficiency: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Language
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

