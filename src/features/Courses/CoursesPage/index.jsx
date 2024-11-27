import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCoursesData } from 'features/Courses/data';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.table.data);
  const { launchId } = useParams();

  useEffect(() => {
    dispatch(fetchCoursesData(launchId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchId]);

  return (
    <div>
      <h1>{JSON.stringify(courses)}</h1>
    </div>
  );
};

export default CoursesPage;
