import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";


const {
    COURSE_CATEGORIES_API,
    EDIT_COURSE_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API
} = courseEndpoints;

export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data 
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST" , CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course details updated successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SECTION API RESPONSE ..............", response);
        if(!response.data.success) {
            throw new Error("Could not Update section")
        }
        toast.success("Course Section Created");
        result = response?.data?.updatedCourseDeatails
    } catch (error) {
        console.log("CREATE SECTION API ERROR ..............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SECTION API RESPONSE ..............", response);
        if(!response.data.success) {
            throw new Error("Could not Update section")
        }
        toast.success("Course Section Updated");
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR ..............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    console.log("delete data: ", data)
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        } )
        console.log("DELETE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
        toast.error(error.message)     
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null,{
            Authorization: `Bearer ${token}`,
        })
        console.log("GET INSTRUCTOR COURSES API RESPONSE............", response)
        if(!response.data.success) {
            throw new Error("Could Not Get Instructor Courses............")
        }
        // toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("GET INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE COURSES API RESPONSE............", response)
        if(!response.data.success) {
            throw new Error("Could Not Delete Course............")
        }
        toast.success("Course Deleted")
    } catch (error) {
        console.log("GET INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }

  //get full course details of a  course
  export const getFullDetailsofCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading....");
    let result = null
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, 
        {
            courseId,
        },
        {
            Authorization: `Bearer ${token}`,
        }
      )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data

    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        result = error.response.data
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result
  }

  export const getCourseDetails = async (courseId) => {
    let result = [];
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId: courseId,
        })
        if(!response?.data?.success)
        throw new Error("Could not Fetch course page data");
        result = response?.data;
    } catch (error) {
        console.log("COURSE PAGE DATA API ERROR....", error);
        toast.error(error.response.data.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId)
    return result
  } 

  // mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }

  // create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error(response.data.error)
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }

  