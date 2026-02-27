import React from "react";

export default function Israel() {
    return (
        <section className="mx-auto p-10 w-[80%] bg-gray-700 p-2 rounded" aria-labelledby="israel-team-title">
            <div className="" id="team-info-container">

            <h2 className="text-[20pt] font-semibold text-white mb-3" id="israel-team-title">Team Info</h2>
            <ul>
                <li className="text-md underlined text-white mb-2">Team Lead: Israel</li>
                <li className="text-md underlined text-white mb-2">Focus: Tier-1 Support</li>
                <li className="text-md underlined text-white mb-2">Members: 6</li>
                
                <img src="https://img.freepik.com/free-photo/little-cat-sitting-grass_1150-17019.jpg?semt=ais_user_personalization&w=740&q=80" alt="Team Mascot" className="mb-2" />
                <li>Slack:<a href="https://lightspeeddms.slack.com/archives/C07CFF8DNMD" target="_blank" rel="noopener noreferrer"> #support-tier-1</a></li>
            </ul>
            </div>
        </section>
    );
}