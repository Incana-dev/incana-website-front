import React from 'react';
import Layout from '../components/Layout';

const AboutPage = () => {
  const skills = [
    'Unity development', 'C# with asp.net', 'Python', 'Powershell', 'Linux', 'ServiceNow', 'JS/HTML/CSS etc', 'Learning Rust', 'Insert the skill your company needs most here ;]'
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6 font-poppins text-center">
          About Me
        </h1>
        <p className="text-lg text-text-body/90 mb-12 text-center">
          I'm a Jack-Of-All-trades developer, with experience in enterprise development, web development, making games, annoying scammers and walking my dog.
        </p>

        <div className="bg-surface p-8 sm:p-10 rounded-lg shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-text-heading mb-4 font-poppins">A Primer</h2>
          <div className="space-y-6 text-text-body">
            <p>
                I became interested in computers at a fairly young age; Back home in Estonia, I was given an 'award for being good at the computer' from my mom's friend when I was six years old. Granted, it wasn't any kind of official accreditation, but it did set me on this path. 
            </p>
            <p>
                The next years flew by: I enjoyed the rustic good-ol-days of writing HTML directly in primary school during our computer classes. I had a lot of fun using Cheat Engine to hack into MapleStory by reading and manipulating its memory addresses directly. When I finally entered a technical college to engage in software engineering more officially, I knew enough from my own studies to be almost offended by the pace and quality of the education I was receiving. For example, It took our class three months to move on from loops and conditionals, and the database structure our DB professor presented as 'aspirational' was in fact a jumble of messy spaghetti.
            </p>
            <p>
                That experience set me back in several ways, but most importantly: I became complacent, Dunning-Kruger-ing myself into thinking I had achieved some amount of knowledge, when really, I had only scratched the surface of technology. When I started working with code on a daily basis, I started to realize how much I was lacking.
            </p>
            <p>
                Now, I take pride in knowing my weaknesses and my strengths. I've experimented with a wide range of technologies, and I've endeavored to keep improving myself, appreciating a breadth of knowledge. I've worked as a Customer Service Rep at a bank, as IT Support, as a Technician hauling around equipment, as a Developer working on Servicenow and Powershell, as a Consultant implementing a variety of solutions using a range of technologies. I'm also acutely aware of societal concerns revolving around gender and the stigmatization of mental health. 
            </p>
            <p>
                I hope to make every day slightly better than the last.
            </p>
            <p>
                Which often involves telling people about my dog.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-heading mb-6 font-poppins">My Toolkit (Not exhaustive!)</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span key={index} className="bg-surface text-text-primary font-semibold px-4 py-2 rounded-full shadow-lg">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;