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

function isAdmin(person: Person): person is Admin {
  return (person as Admin).role !== undefined
}

const people: Person[] = [
  { name: 'Toto Dupont', age: 35, occupation: 'Postman' },
  { name: 'Jeanne Doe', age: 25, role: 'Admin' },
]

function getPersonDescription(person: Person): string {
  if (isAdmin(person)) {
    return `${person.name} is ${person.age} years old; they are a superuser with the role of ${person.role}`
  } else {
    return `${person.name} is ${person.age} years old; they are a user and their occupation is ${person.occupation}`
  }
}

for (let person of people) {
  console.log(getPersonDescription(person))
}


