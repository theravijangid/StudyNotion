import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsofCourse } from '../services/operations/courseDetailsAPI';
import { setCourse } from '../slices/courseSlice';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false)
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificationDetails = async() => {
            const courseData = await getFullDetailsofCourse(courseId, token);
            console.log("Printing course data...",courseData)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setCourseEntireData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificationDetails();
    },[]);

  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-8">
                    <Outlet />
                </div>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse