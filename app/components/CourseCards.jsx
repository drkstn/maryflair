import CourseCard from "./CourseCard";

export default function CourseCards({ data }) {
  return (
    <>
      {data?.courses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-2">
          {data.courses.map((course) => (
            <CourseCard key={course._id} data={data} course={course} />
          ))}
        </div>
      ) : (
        <p>You currently do not have any courses.</p>
      )}
    </>
  );
}
