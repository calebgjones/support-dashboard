import React from "react";

export default function Team() {
    return (
        <section className="mx-auto p-10 w-[80%] bg-gray-800 p-2 rounded" aria-labelledby="team-title">
            <div className="" id="team-info-container">

            <h2 className="text-[20pt] font-semibold text-white mb-3" id="team-title">Team Info</h2>
            <ul>
                <li className="text-md underlined text-white mb-2">Team Leader: Dom</li>
                <li className="text-md underlined text-white mb-2">Focus: Tier 3 Support</li>
                <li className="text-md underlined text-white mb-2">Members: 3</li>
                
                <img src="https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_1280.jpg" alt="Team Mascot" className="mb-2" />
                <li>Slack:<a href="https://lightspeeddms.slack.com/archives/C07CFF8DNMD" target="_blank" rel="noopener noreferrer"> #support-ops</a></li>
            </ul>
            </div>
        </section>
    );
}