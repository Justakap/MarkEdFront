import React from 'react';


export default function Result(props) {

    let { marks, TotalQuestion, subject, number } = props;

    let percent = 100 * (marks / TotalQuestion)

    const again = () => {
        window.location.reload()

    }

    return (
        <>

            <div className=" w-fit m-auto">
                <div className=" flex flex-wrap ">

                    <div className="w-96 rounded overflow-hidden shadow-lg m-6 my-8">
                        <p className='text-center font-bold text-blue-400 text-3xl'> Assesment {number}</p>
                        <p className='text-center font-bold text-green-400 text-2xl m-2'>{subject}</p>
                        <img className='w-40 m-auto' src="https://i.pinimg.com/736x/51/4c/c0/514cc0aec0350e6b325271880ba85570.jpg" alt="" />
                        <div className="px-3 py-2">
                            <div className="text-center font-bold text-black text-2xl m-2">
                                Assesment Score : {percent.toFixed(2)}%
                            </div>
                            <div className="font-bold text-xl mb-4 text-center flex justify-between">
                                <p className='text-center font-bold text-green-500 text-2xl m-2'> Correct : {marks} </p>
                                <p className='text-center font-bold text-red-500 text-2xl m-2'> Incorrect: {TotalQuestion-marks}</p>
                            </div>
                            <button onClick={again} className='ml-24 my-2 w-40 font-semibold btn btn-info border-blue-400 hover:bg-blue-600 hover:border-blue-400 bg-blue-500 text-white'>Attempt Again</button>
                        </div>
                    </div>  

                </div>

            </div>
        </>
    );
}
