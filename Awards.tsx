import { useFieldArray, useForm } from "react-hook-form"

interface AwardsProps {
  updateResumeData: (data: object) => void
}

export default function Awards({ updateResumeData }: AwardsProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      awards: [{ name: "", organization: "", date: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  })

  const onSubmit = (data) => {
    updateResumeData({ awards: data.awards })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Awards and Recognition</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Award {index + 1}</h3>

          <div>
            <label htmlFor={`awards.${index}.name`} className="block text-sm font-medium text-gray-700">
              Award Name
            </label>
            <input
              type="text"
              id={`awards.${index}.name`}
              {...register(`awards.${index}.name`, { required: "Award name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.awards?.[index]?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.awards[index].name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`awards.${index}.organization`} className="block text-sm font-medium text-gray-700">
              Awarding Organization
            </label>
            <input
              type="text"
              id={`awards.${index}.organization`}
              {...register(`awards.${index}.organization`, { required: "Awarding organization is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.awards?.[index]?.organization && (
              <p className="mt-1 text-sm text-red-600">{errors.awards[index].organization.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`awards.${index}.date`} className="block text-sm font-medium text-gray-700">
              Date Received
            </label>
            <input
              type="date"
              id={`awards.${index}.date`}
              {...register(`awards.${index}.date`, { required: "Date received is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.awards?.[index]?.date && (
              <p className="mt-1 text-sm text-red-600">{errors.awards[index].date.message}</p>
            )}
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Award
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", organization: "", date: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Award
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

