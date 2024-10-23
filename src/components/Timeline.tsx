// src/components/Timeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { WiTrain } from 'react-icons/wi';
import useMediaQuery from '../helper/useMediaQuery';

interface TimelineEntry {
    date: string;
    content: string;
    source: string;
    image?: string;
}

interface TimelineProps {
    entries: TimelineEntry[];
}

const Timeline: React.FC<TimelineProps> = ({ entries }) => {
    const isMD = useMediaQuery('(min-width: 768px)');

    return (
        <div className="container mx-auto" aria-label="Project Timeline">
            <div className="relative">
                {/* Central vertical line */}
                <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-[4px] border-[#8ac1ff] z-0"></div>

                <div className="block md:hidden absolute top-0 left-4 transform -translate-x-1/2 h-full border-l-[4px] border-[#8ac1ff] z-0"></div>

                {/* Timeline Entries */}
                <div className="space-y-12">
                    {entries.map((entry, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-row items-center relative`}
                            >
                                {/* Alternate flex direction for alternating entries */}
                                <div
                                    className={`flex flex-row items-center md:w-full ${isLeft ? '' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Content */}
                                    {isMD ? (
                                        <div className="md:w-5/12">
                                            {isLeft ? (
                                                <motion.div
                                                    className="bg-white dark:bg-gray-800 p-4 rounded shadow-md hover:shadow-xl transition-shadow duration-300"
                                                    initial={{ opacity: 0, x: -50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5 }}
                                                    role="article"
                                                    aria-labelledby={`timeline-entry-${index}-date`}
                                                >
                                                    {entry.image && (
                                                        <div className='rounded-md overflow-hidden mb-4'>
                                                            <img src={entry.image} alt={entry.date} />
                                                        </div>
                                                    )}
                                                    <h3
                                                        id={`timeline-entry-${index}-date`}
                                                        className="font-semibold text-lg text-gray-800 dark:text-white"
                                                    >
                                                        {entry.date}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        {entry.content}
                                                    </p>
                                                    <a href={entry.source} className="text-sm text-[#3c5ec6] dark:text-[#84dcff] mt-2 hover:underline">
                                                        Source
                                                    </a>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    className="bg-white dark:bg-gray-800 p-4 rounded shadow-md hover:shadow-xl transition-shadow duration-300"
                                                    initial={{ opacity: 0, x: 50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5 }}
                                                    role="article"
                                                    aria-labelledby={`timeline-entry-${index}-date`}
                                                >
                                                    {entry.image && (
                                                        <div className='rounded-md overflow-hidden mb-4'>
                                                            <img src={entry.image} alt={entry.date} />
                                                        </div>
                                                    )}
                                                    <h3
                                                        id={`timeline-entry-${index}-date`}
                                                        className="font-semibold text-lg text-gray-800 dark:text-white"
                                                    >
                                                        {entry.date}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        {entry.content}
                                                    </p>
                                                    <a href={entry.source} className="text-sm text-[#3c5ec6] dark:text-[#84dcff] mt-2 hover:underline">
                                                        Source
                                                    </a>
                                                </motion.div>
                                            )}
                                        </div>
                                    ) : (
                                        <>

                                        </>
                                    )}

                                    {/* Dot */}
                                    {isMD ? (
                                        <div className="flex flex-col items-center justify-center md:w-2/12">
                                            <div className='w-10 h-10 bg-[#8ac1ff] rounded-full absolute' />
                                            <motion.div
                                                className="flex items-center justify-center w-8 h-8 bg-[#3b6494] rounded-full shadow-md z-10"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                aria-hidden="true"
                                            >
                                                <WiTrain size={30} className="text-white" />
                                            </motion.div>
                                        </div>

                                    ) : (
                                        <div className="flex flex-row md:w-2/12 relative">
                                            <div className='w-10 h-10 bg-[#8ac1ff] rounded-full -left-1 absolute inset-0 m-auto z-10' />
                                            <motion.div
                                                className="flex items-center justify-center w-8 h-8 bg-[#3b6494] rounded-full shadow-md z-20"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                aria-hidden="true"
                                            >
                                                <WiTrain size={30} className="text-white" />
                                            </motion.div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile View: Content Below Dot */}
                                <div className="mt-4 ml-14 md:hidden flex-grow">
                                    <motion.div
                                        className="bg-white dark:bg-gray-800 p-4 rounded shadow-md hover:shadow-xl transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        role="article"
                                        aria-labelledby={`timeline-entry-${index}-date`}
                                    >
                                        {entry.image && (
                                            <div className='rounded-md overflow-hidden mb-4'>
                                                <img src={entry.image} alt={entry.date} />
                                            </div>
                                        )}
                                        <h3
                                            id={`timeline-entry-${index}-date`}
                                            className="font-semibold text-lg text-gray-800 dark:text-white"
                                        >
                                            {entry.date}
                                        </h3>
                                        <div className='w-full h-[1px] dark:bg-[#ffffff1b] bg-[#0000001b] my-2' />
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {entry.content}
                                        </p>
                                        <a href={entry.source} className="text-sm text-[#3c5ec6] dark:text-[#84dcff] mt-2 hover:underline">
                                            Source
                                        </a>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
