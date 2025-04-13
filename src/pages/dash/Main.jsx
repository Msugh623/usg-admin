import React from 'react';
import {  FaBook, FaRegNewspaper, FaRegComments, FaExchangeAlt } from 'react-icons/fa';
import { MdEvent, MdOutlineWaves } from 'react-icons/md';
// import { AiOutlineFundProjectionScreen, AiOutlineTeam } from 'react-icons/ai';
import { BsBarChart, BsFillPeopleFill } from 'react-icons/bs';
import { useStateContext } from '../../state/StateContext';
import Delay from '../../components/Delay';

const Main = () => {
    const {amw,resources,programmes,events,users,industries,impact}=useStateContext()
  const stats = [
    { title: 'Alumni Making Waves', count: amw?.length, icon: <MdOutlineWaves className="text-green-500" /> },
    { title: 'Resources', count: resources?.length, icon: <FaBook className="text-blue-500" /> },
    // { title: 'Sub-Committees', count: 28, icon: <AiOutlineTeam className="text-purple-500" /> },
    { title: 'Events', count: events?.length, icon: <MdEvent className="text-orange-500" /> },
    { title: 'Exchange Programmes', count: programmes?.length, icon: <FaExchangeAlt className="text-teal-500" /> },
    { title: 'Members', count: users?.length, icon: <BsFillPeopleFill className="text-blue-500" /> },
    // { title: 'Testimonials', count: 14, icon: <FaRegComments className="text-purple-500" /> },
    { title: 'Industries', count: industries?.length, icon: <BsBarChart className="text-yellow-500" /> },
    { title: 'Impact Stories', count: impact.length, icon: <FaRegNewspaper className="text-orange-500" /> },
    // { title: 'Projects', count: 500, icon: <AiOutlineFundProjectionScreen className="text-yellow-500" /> },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
            <Delay delay={50*index}>
          <div
            key={index}
            className="flex slideUp flex-col bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
            <p className="text-2xl d-flex font-bold text-gray-900">{stat.count}
                    <div className="text-4xl mb-2 ms-auto">{stat.icon}</div>
                </p>
                      </div>
            </Delay>
        ))}
      </div>
    </div>
  );
};

export default Main;