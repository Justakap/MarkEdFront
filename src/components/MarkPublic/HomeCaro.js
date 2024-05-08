import React from 'react';
import Choice from './Choice';
import "./load.css"

export default function HomeCaro(props) {
  const choices = [

    {
      id: "B",
      to: "LogResources",
      type: "Videos",
      desc: "Get All the Videos Available",
      image: "https://png.pngtree.com/template/20190316/ourmid/pngtree-audio-video-logo-image_80747.jpg",
    },
    {
      id: "C",
      to: "LogAssessment",
      type: "Assessment",
      desc: "Complete all the Assesment Available",
      image: "https://w7.pngwing.com/pngs/819/737/png-transparent-computer-icons-assessment-logo-organization-risk-thumbnail.png",
    },
    {
      id: "A",
      to: "LogResources",
      type: "Notes",
      desc: "Get All the Notes Available",
      image: "https://static.vecteezy.com/system/resources/previews/004/852/841/non_2x/notes-notepad-notebook-memo-diary-paper-line-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg",
    },
    // Add more choices as needed
  ];

  return (
    <div className=" py-10 resourceImage">
      <div className="container mx-auto">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-dark text-center text-4xl mb-4">Resources Available</h2>
        <hr className='w-2/5 m-auto border-dotted text-3xl h-1 my-8 bg-white border-0 rounded' />
        {/* <div className="flex justify-center flex-wrap p-4 space-x-6 mt-2"> */}
        <div className=" flex r flex-wrap p-4 mt-2 justify-between">
          {choices.map((element) => (
            <Choice className="m-4" key={element.id} type={element.type} to={element.to} desc={element.desc} image={element.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
