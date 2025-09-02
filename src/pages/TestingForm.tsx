import React from 'react'

const TestingForm = () => {
    return (
        <div>
            <form name='contact v1' method='post' data-netlify='true' onSubmit={"submit"} >
                <input type="hidden" name="form-name" value={"contact v1"} />
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="first-name" required />
                </div>
                <div>
                    <label htmlFor="email">Name</label>
                    <input type="email" id='email' name="email" required />
                </div>
                <div>
                    <label >Message</label>
                    <textarea name="message" required />
                </div>


                <button type='submit'>Submit Resultrs</button>
            </form>
        </div>
    )
}

export default TestingForm
