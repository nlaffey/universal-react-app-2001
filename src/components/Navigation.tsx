import * as React from 'react'



interface NavigationProps {
}

export default class extends React.Component<NavigationProps> {

    render() {
        return (
            <ul>
                <li><a href="/"><span>Menu</span></a></li>
                <li><a href="/merch"><span>Merch</span></a></li>
                <li>Catering</li>
            </ul>
        )
    }
}
