import { useFieldArray, useForm } from "react-hook-form"

interface PublicationsProps {
  updateResumeData: (data: object) => void
}

export default function Publications({ updateResumeData }: PublicationsProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      publications: [{ title: "", publisher: "", date: "", url: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "publications",
  })

  const onSubmit = (data) => {
    updateResumeData({ publications: data.publications })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Publications</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Publication {index + 1}</h3>

          <div>
            <label htmlFor={`publications.${index}.title`} className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id={`publications.${index}.title`}
              {...register(`publications.${index}.title`, { required: "Title is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.publications?.[index]?.title && (
              <p className="mt-1 text-sm text-red-600">{errors.publications[index].title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`publications.${index}.publisher`} className="block text-sm font-medium text-gray-700">
              Publisher/Journal
            </label>
            <input
              type="text"
              id={`publications.${index}.publisher`}
              {...register(`publications.${index}.publisher`, { required: "Publisher is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.publications?.[index]?.publisher && (
              <p className="mt-1 text-sm text-red-600">{errors.publications[index].publisher.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`publications.${index}.date`} className="block text-sm font-medium text-gray-700">
              Date Published
            </label>
            <input
              type="date"
              id={`publications.${index}.date`}
              {...register(`publications.${index}.date`, { required: "Date published is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.publications?.[index]?.date && (
              <p className="mt-1 text-sm text-red-600">{errors.publications[index].date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`publications.${index}.url`} className="block text-sm font-medium text-gray-700">
              URL (Optional)
            </label>
            <input
              type="url"
              id={`publications.${index}.url`}
              {...register(`publications.${index}.url`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Publication
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ title: "", publisher: "", date: "", url: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Publication
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

