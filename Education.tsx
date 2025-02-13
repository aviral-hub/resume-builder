import { useFieldArray, useForm } from "react-hook-form"

interface EducationProps {
  updateResumeData: (data: object) => void
}

export default function Education({ updateResumeData }: EducationProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: [{ degree: "", institution: "", graduationDate: "", gpa: "", coursework: "", honors: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  })

  const onSubmit = (data) => {
    updateResumeData({ education: data.education })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Education</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Education {index + 1}</h3>

          <div>
            <label htmlFor={`education.${index}.degree`} className="block text-sm font-medium text-gray-700">
              Degree/Certification
            </label>
            <input
              type="text"
              id={`education.${index}.degree`}
              {...register(`education.${index}.degree`, { required: "Degree is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.education?.[index]?.degree && (
              <p className="mt-1 text-sm text-red-600">{errors.education[index].degree.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`education.${index}.institution`} className="block text-sm font-medium text-gray-700">
              Institution
            </label>
            <input
              type="text"
              id={`education.${index}.institution`}
              {...register(`education.${index}.institution`, { required: "Institution is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.education?.[index]?.institution && (
              <p className="mt-1 text-sm text-red-600">{errors.education[index].institution.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`education.${index}.graduationDate`} className="block text-sm font-medium text-gray-700">
              Graduation Date
            </label>
            <input
              type="month"
              id={`education.${index}.graduationDate`}
              {...register(`education.${index}.graduationDate`, { required: "Graduation date is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.education?.[index]?.graduationDate && (
              <p className="mt-1 text-sm text-red-600">{errors.education[index].graduationDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`education.${index}.gpa`} className="block text-sm font-medium text-gray-700">
              GPA (Optional)
            </label>
            <input
              type="text"
              id={`education.${index}.gpa`}
              {...register(`education.${index}.gpa`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor={`education.${index}.coursework`} className="block text-sm font-medium text-gray-700">
              Relevant Coursework (Optional)
            </label>
            <input
              type="text"
              id={`education.${index}.coursework`}
              {...register(`education.${index}.coursework`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor={`education.${index}.honors`} className="block text-sm font-medium text-gray-700">
              Honors/Awards (Optional)
            </label>
            <input
              type="text"
              id={`education.${index}.honors`}
              {...register(`education.${index}.honors`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Education
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ degree: "", institution: "", graduationDate: "", gpa: "", coursework: "", honors: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Education
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

