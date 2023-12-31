import React from 'react';
import Choice from './Choice';

export default function HomeCaro(props) {
  const choices = [
    {
      id: "A",
      to: "Resources",
      type: "Notes",
      desc: "Get All the Notes Available",
      image: "https://static.vecteezy.com/system/resources/previews/004/852/841/non_2x/notes-notepad-notebook-memo-diary-paper-line-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg" ,
    },
    {
        id: "B",
        to: "Resources",
        type: "Videos",
        desc: "Get All the Videos Available",
        image: "https://png.pngtree.com/template/20190316/ourmid/pngtree-audio-video-logo-image_80747.jpg",
    },
    {
        id: "C",
        to: "Resources",
        type: "PYQ",
        desc: "Get All the PYQ's Available",
        image: "https://static.vecteezy.com/system/resources/previews/010/138/201/original/pyq-letter-technology-logo-design-on-white-background-pyq-creative-initials-letter-it-logo-concept-pyq-letter-design-vector.jpg",
    },
    // Add more choices as needed
  ];

  return (
    <div style={{backgroundColor:"#D0BFFF", height:"100vh"}} className=" py-10 ">
      <div className="container mx-auto">
        <h2 className="font-bold text-dark text-center text-4xl mb-4">Resources Available</h2>
        <hr className='w-2/5 m-auto border-dotted text-3xl h-1 my-8 bg-white border-0 rounded' />
        <div className="flex justify-center flex-wrap p-4 space-x-6 mt-28">
          {choices.map((element) => (
            <Choice className="m-4" key={element.id} type={element.type} to={element.to} desc={element.desc} image={element.image}/>
          ))}
        </div>
      </div>
    </div>
  );
}
