import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Iconbtn from '../../../../common/Iconbtn';
import Upload from '../Upload';

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    getValues,
  } = useForm();

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title || 
       currentValues.lectureDesc !== modalData.description ||
       currentValues.lectureVideo !== modalData.videoUrl) {
        return true;
       }
    else {
      return false;
    }
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if(currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if(currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if(currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }
    console.log("Section Id",modalData.sectionId)
    console.log("subSectionId: ",modalData._id)
    setLoading(true);
    const result = await updateSubSection(formData, token);
    if(result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
 
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  }

  const onSubmit = async (data) => {
    if(view) {
      return;
    } 

    if(edit) {
      if(!isFormUpdated) {
        toast.error("No changes made to the form")
      }
      else{
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId",modalData);
    formData.append("title",data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    const result = await createSubSection(formData,token);

    if(result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))

    }
    setModalData(null);
    setLoading(false);
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
          <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
            <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture</p>
            <button
              onClick={() => (!loading ? setModalData(null) : {})}
            >
              <RxCross1 className='text-2xl font-extrabold text-richblack-5'/>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
              <Upload 
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
              />
              <div className="flex flex-col space-y-2">
                <label className='lable-style' htmlFor='lectureTitle'>Lecture Title <sup className='text-pink-300'>*</sup></label>
                <input
                  id='lectureTitle'
                  placeholder='Enter Lecture Title'
                  {...register("lectureTitle", {required:true})}
                  className='w-full form-style'
                />
                {errors.lectureTitle && (
                  <span>Lecture Title is required</span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className='lable-style' htmlFor='lectureDesc'>Lecture Description <sup className='text-pink-300'>*</sup></label>
                <textarea
                  id='lectureDesc'
                  placeholder='Enter Lecture description'
                  {...register("lectureDesc", {required:true})}
                  className='w-full min-h-[130px] form-style'
                />
                {errors.lectureDesc && (
                  <span>Lecture description is required</span>
                )}
              </div>

              {
                !view && (
                  <div className='flex justify-end'>
                    <Iconbtn
                      text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                    />
                  </div>
                )
              }
          </form>
        </div>
    </div>
  )
}

export default SubSectionModal