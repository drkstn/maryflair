export default function DailyScheduleList({ scheduleData, lessonData }) {
  return (
    <>
      {scheduleData.map((schedule, scheduleIndex) => (
        <section key={schedule._id} className="mb-6">
          <h2 className="font-bold text-2xl text-purple-500 mb-2">
            {schedule.name}
          </h2>
          <hr className="border-4 border-purple-500 mb-4" />

          {lessonData[scheduleIndex]?.courses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-2">
              {lessonData[scheduleIndex].courses.map((course) => (
                <div
                  key={course._id}
                  className="mb-2 border border-slate-300 rounded-xl p-2"
                >
                  <div className="bg-purple-500 uppercase tracking-wider text-white font-bold text-sm py-2 px-3 rounded-md">
                    {course.name}
                  </div>
                  {course?.lessons.length > 0 ? (
                    <div className="p-2">
                      {course?.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson._id}>
                          {/* <hr className="border-4 border-purple-500 my-2" /> */}
                          <p className="my-2 font-bold text-slate-700 max-w-xl">
                            {lesson.name}
                          </p>
                          {lesson.materials.length > 0 ? (
                            <p className="text-sm text-slate-500 max-w-xl">
                              <span className=" text-purple-500 mr-1">
                                Materials:
                              </span>
                              {lesson.materials}
                            </p>
                          ) : null}
                          {lesson.assignments.length > 0 ? (
                            <p className="text-sm text-slate-500 max-w-xl">
                              <span className=" text-purple-500 mr-1">
                                Assignments:
                              </span>
                              {lesson.assignments}
                            </p>
                          ) : null}
                          {lesson.notes.length > 0 ? (
                            <p className="text-sm text-slate-500 max-w-xl">
                              <span className=" text-purple-500 mr-1">
                                Notes:
                              </span>
                              {lesson.notes}
                            </p>
                          ) : null}
                          {lessonIndex < course.lessons.length - 1 && (
                            <hr className="my-4 border-purple-500 border-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2">
                      <p className="mt-2 text-sm text-slate-500 max-w-xl">
                        No lessons scheduled today.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Wahoo! No lessons today. Enjoy!</p>
          )}
        </section>
      ))}
    </>
  );
}
