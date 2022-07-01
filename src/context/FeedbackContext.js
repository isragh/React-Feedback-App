import { createContext, useState, /*useEffect*/ } from 'react'
import { v4 as uuidv4 } from 'uuid'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    // const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            rating: 10,
            text: "This is feedback item 1 coming from the backend"
        },
        {
            id: 2,
            rating: 8,
            text: "This is feedback item 2 coming from the backend"
        }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // useEffect(() => {
    //     fetchFeedback()
    // }, [])

    // Fetch feedback
    // const fetchFeedback = async () => {
    //     const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
    //     const data = await response.json()

    //     setFeedback(data)
    //     setIsLoading(false)
    // }

    // Add feedback
    const addFeedback = /*async*/ (newFeedback) => {
        // const response = await fetch('http://localhost:5000/feedback', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newFeedback),
        // })

        // const data = await response.json()

        // setFeedback([data, ...feedback])
        newFeedback.id = feedback.uuid
        setFeedback([newFeedback, ...feedback])
    }

    // Delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            // await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' })

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Update feedback item
    const updateFeedback = /*async*/ (id, updItem) => {
        // const response = await fetch(`http://localhost:5000/feedback/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(updItem),
        // })

        // const data = await response.json()


        setFeedback(feedback.map((item) => (item.id === id ? {...item, ...updItem} : item)))

        setFeedbackEdit({
            item: {},
            edit: false,
        })
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                // isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext