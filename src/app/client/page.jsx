'use client'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import React from 'react'

const query = gql`
query {
    characters(page: 2, filter: { name: "rick" }) {
    results {
            id
            name
            image
        }
    }
}
`

function ClientPage() {
    const { data } = useSuspenseQuery(query)
    console.log(data)
    return (
        <div className=' grid grid-cols-4'>
            {data.characters.results.map(character => (
                <div key={character.id}>
                    <img src={character.image} alt={character.name} />
                    <h3>{character.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default ClientPage