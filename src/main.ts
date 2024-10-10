// // Lab 3

// type Name = string

// interface User {
//   name: Name,
//   age: number,
//   occupation: string
// }

// interface Admin {
//   name: Name,
//   age: number,
//   role: string
// }

// type Person = User | Admin

// function isAdmin(person: Person): person is Admin {
//   return (person as Admin).role !== undefined
// }

// const people: Person[] = [
//   { name: 'Toto Dupont', age: 35, occupation: 'Postman' },
//   { name: 'Jeanne Doe', age: 25, role: 'Admin' },
// ]

// function getPersonDescription(person: Person): string {
//   if (isAdmin(person)) {
//     return `${person.name} is ${person.age} years old; they are a superuser with the role of ${person.role}`
//   } else {
//     return `${person.name} is ${person.age} years old; they are a user and their occupation is ${person.occupation}`
//   }
// }

// for (let person of people) {
//   console.log(getPersonDescription(person))
// }


// // Lab 4

// // 1. Overloading
// import dayjs from 'dayjs'
// const possibleFormats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MMM Do YY', 'MMMM Do YY', 'MMM Do YYYY', 'MMMM Do YYYY']

// // overloaded functions (wouldn't a union be better here though?)
// function formatDate(date: Date): string
// function formatDate(date: string): string
// function formatDate(date: Date, includeTime: boolean): string
// function formatDate(date: string, includeTime: boolean): string
// function formatDate(date: Date | string, includeTime: boolean = false): string {
//   if (!(date instanceof Date)) {
//     date = dayjs(date, possibleFormats).toDate()
//   }
  
//   let res: string = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`
//   if (includeTime) {
//     res += ` ${date.getUTCHours()}:${date.getUTCMinutes()}`
//   }

//   return res
// }

// console.log(formatDate(new Date()))
// console.log(formatDate('2024-12-25'))

// // 2. Optional arguments
// function greet(name: string, age?: number): string {
//   let res = `Hello, ${name}!`
//   if (age !== undefined) {
//     res += ` You are ${age} years old.`
//   }
//   return res
// }

// console.log(greet('Nicolas'))
// console.log(greet('Toto', 42))

// // 3. Generics
// function getFirst<T>(ar: Array<T>): T {
//   return ar[0]
// }

// console.log(getFirst(['a', 'b', 'c']))
// console.log(getFirst([1, 2, 3]))
// console.log(getFirst([1, {test: false}])) // shouldn't this fail to compile? I assume some .tsconfig option would allow this issue to be detected?

// // 4. Type guards
// function isString(x: any): x is string {
//   return typeof x === 'string'
// }

// function processInput(input: string | number): void {
//   if (isString(input)) {
//     console.log(input.toUpperCase())
//   } else {
//     console.log(input)
//   }
// }

// processInput(3)
// processInput('test')

// // Lab 5
// class Stack<Type extends { id: number }> {
//   private data: Array<Type> = []
//   private indices: number[] = []

//   push(a: Type): void {
//     this.data.push(a)
//     this.indices.push(a.id)
//   }

//   pop(): Type | undefined {
//     this.indices.pop()
//     return this.data.pop()
//   }

//   get(id: number): Type {
//     const idx = this.indices.findIndex((index) => index === id)
//     return this.data[idx]
//   }
// }

// const s = new Stack()
// const a = { id: 0, someData: 'a' }
// const one = { id: 1, sub: { toto: true }, text: 'some text' }
// const test = { id: 5, ar: [1,2,3]}
// s.push(a)
// s.push(one)
// s.push(test)

// console.log(s.get(1))
// console.log(s.get(5))

// console.log(s.pop())
// console.log(s.pop())


// Lab 6
function catchAndLogDecoratorFactory(logLevel: 'debug' | 'error', notifyOnError: boolean) {
  return function catchAndLog(target: Function, context: DecoratorContext): any {
    return function newMethod(this: any, ...args: any[]) {
      try {
        return target.call(this, ...args)
      } catch (err) {
        if (notifyOnError) {
          console.log(`[${logLevel === 'debug' ? 'D' : 'E'}] - failure in ${context.name?.toString()}: ${err}`)
        }
      }
    }
  }
}

class PaymentProcessor {
  @catchAndLogDecoratorFactory('error', true)
  processPayment(amount: number, accountID: string) {
    if (amount <= 0) {
      throw new Error('Invalid amount for payment processing')
    }
    console.log(`Processing payment for ${amount} for account ${accountID}`)
  }
}

const processor = new PaymentProcessor()
processor.processPayment(0, '12345')
