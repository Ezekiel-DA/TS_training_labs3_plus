// Lab 3

type Name = string

interface User {
  name: Name,
  age: number,
  occupation: string
}

interface Admin {
  name: Name,
  age: number,
  role: string
}

type Person = User | Admin

const people: Person[] = [
  { name: 'Toto Dupont', age: 35, occupation: 'Postman' },
  { name: 'Jeanne Doe', age: 25, role: 'Admin' },
]

function getPersonDescription(person: Person): string {
  return `${person.name} is ${person.age} years old`
}

for (let person of people) {
  console.log(getPersonDescription(person))
}
