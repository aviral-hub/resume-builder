import { useFieldArray, useForm } from "react-hook-form"

interface WorkExperienceProps {
  updateResumeData: (data: object) => void
}

export default function WorkExperience({ updateResumeData }: WorkExperienceProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experiences: [{ jobTitle: "", company: "", startDate: "", endDate: "", location: "", responsibilities: [""] }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  })

  const onSubmit = (data) => {
    updateResumeData({ workExperience: data.experiences })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Job {index + 1}</h3>

          <div>
            <label htmlFor={`experiences.${index}.jobTitle`} className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id={`experiences.${index}.jobTitle`}
              {...register(`experiences.${index}.jobTitle`, { required: "Job title is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.experiences?.[index]?.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.experiences[index].jobTitle.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`experiences.${index}.company`} className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id={`experiences.${index}.company`}
              {...register(`experiences.${index}.company`, { required: "Company name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.experiences?.[index]?.company && (
              <p className="mt-1 text-sm text-red-600">{errors.experiences[index].company.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`experiences.${index}.startDate`} className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="month"
                id={`experiences.${index}.startDate`}
                {...register(`experiences.${index}.startDate`, { required: "Start date is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.experiences?.[index]?.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.experiences[index].startDate.message}</p>
              )}
            </div>
            <div>
              <label htmlFor={`experiences.${index}.endDate`} className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="month"
                id={`experiences.${index}.endDate`}
                {...register(`experiences.${index}.endDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <p className="mt-1 text-sm text-gray-500">Leave blank if current job</p>
            </div>
          </div>

          <div>
            <label htmlFor={`experiences.${index}.location`} className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id={`experiences.${index}.location`}
              {...register(`experiences.${index}.location`)}
              placeholder="City, State/Province"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Responsibilities/Achievements</label>
            {field.responsibilities.map((_, respIndex) => (
              <div key={respIndex} className="mt-2 flex items-center">
                <input
                  type="text"
                  {...register(`experiences.${index}.responsibilities.${respIndex}`, {
                    required: "Responsibility is required",
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button type="button" onClick={() => remove(index)} className="ml-2 text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ responsibility: "" })}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Add Responsibility
            </button>
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Job
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ jobTitle: "", company: "", startDate: "", endDate: "", location: "", responsibilities: [""] })
        }
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Job
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

