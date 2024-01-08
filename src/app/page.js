import Image from 'next/image'
import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'
async function loadData() {
  const { data } = await getClient().query({
    query: gql`
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
  })
  return data.characters.results
}

async function HomePage() {
  const characters = await loadData()
  return (
    <div className='grid grid-cols-3'>
      {characters.map(character => (
        <div key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
  )
}

export default HomePage