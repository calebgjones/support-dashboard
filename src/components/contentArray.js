const contentArray = [
/*

~i text ~i - italic
~b text ~b - bold
~u text ~u - underline
~n - line break

Tags can be nested/stacked: "~u~bhello world~b~u this is Caleb"
Results in: bold+underlined "hello world" followed by unstyled "this is Caleb"

------------------------------------------

Content Structure:

{
    module: "Module Name",
    sections: [
        {
            title: "Section Title",
            subsections: [
                {
                    title: "Subsection Title",
                    info: "info requirements text (supports markup tags)",
                    article: "Knowledge base article number",
                    notes: "",
                    modal: false,  // true = show info modal when clicked
                    mult: false // true = show modal AND navigate to route (requires modal: true)
                }
            ],
            info: "info requirements for this section",
            article: "Knowledge base article number",
            notes: "Additional notes",
            modal: false,  // true = show info modal when clicked
            mult: false    // true = show modal AND navigate to route (requires modal: true)
        }
    ]
}

Note: 
- modal: true + mult: false/undefined → Show modal, prevent navigation
- modal: true + mult: true → Show modal AND navigate to route
- modal: false → No modal, just navigate to section page

*/

    {
        module: "Home",
        section: "Home",
        subsection: "",
        info: "~uNone~u",
        notes: "Notes about the site and how it can be used.",
        modal: false
    },

    {
       module: "Teams",
        sections: [
            {
                    title: "Tier 1",
                    subsections: [
                        {
                            title: "Tyler",
                            info: "Tyler's team of Tier 1 agents",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Israel",
                            info: "Israel's team of Tier 1 agents",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Porter",
                            info: "Porter's team of Tier 1 chat agents",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Walker",
                            info: "Walker's team of Tier 1 agents",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: true // true = show modal AND navigate to route (requires modal: true)
                        }
                    ]
                },
                {
                    title: "Tier 2",
                    subsections: [
                        {
                            title: "Leads",
                            info: "info requirements text (supports markup tags)",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Saturdays",
                            info: "info requirements text (supports markup tags)",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Full-Time Agents",
                            info: "info requirements text (supports markup tags)",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Beta Agents",
                            info: "Beta Tier 2 agents. Monitor their performance to help them grow and improve.",
                            notes: "",
                            modal: true,  // true = show info modal when clicked
                            mult: true // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "White Glove",
                            info: "info requirements text (supports markup tags)",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }
                    ]
                },
                {
                    title: "Operations",
                    notes: "Ops team",
                    subsections: [
                        {
                            title: "Dom",
                            info: "This is the info for Dom.",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Spencer",
                            info: "",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Fig",
                            info: "",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: false // true = show modal AND navigate to route (requires modal: true)
                        }, 
                        {

                            title: "Jon",
                            info: "",
                            notes: "",
                            modal: false,  // true = show info modal when clicked
                            mult: true // true = show modal AND navigate to route (requires modal: true)
                        }
                    ]
                }
    ]
    }


];
export default contentArray;