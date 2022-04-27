export default function GetPorts() {
    return fetch('https://api.github.com/orgs/catppuccin/repos?per_page=100&sort=full_name&direction=asc')
    .then(response => response.json())
    .then(data => {
        const PortData = data.map(port => {
            return {
                name: port.name,
                key: port.id,
                full_name: port.full_name,
                endpoint: port.url,
                collaborators: port.collaborators_url,
                description: port.description,
                url: port.html_url,
                language: port.language,
                stars: port.stargazers_count,
                forks: port.forks,
                issues: port.open_issues,
                updated: port.updated_at,
                owner_av: port.owner.avatar_url,
                contributors_url: port.contributors_url,
            }
        })
        //console.log(PortData)
        return PortData
    })
}