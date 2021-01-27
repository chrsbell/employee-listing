# `Employee Search Tool`

## About

A simple employee search tool using mock data, using React/styled-components.

## Features

- [x] Displays the employee data below
- [x] Allows a user to search for an employee by name
- [x] Allows a user to filter the data by both department and age

## Installing Dependencies

```sh
npm i
```

## Server API

```json
Employee {
  "name": "string",
  "department": "string",
  "age": "number",
}
```

```json
AgeRange {
  "min": "number",
  "max": "number",
}
```

### Get the full employee list.

GET `/api/employees/`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "list": "Array<Employee>",
  "departments": "Array<string>",
  "ageRanges": "Array<AgeRange>"
}
```

### Search the employee list.

GET `/api/employees/search?params`

params - name, minAge, maxAge, department

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "list": "Array<Employee>",
  "departments": "Array<string>",
  "ageRanges": "Array<AgeRange>"
}
```

## Ideas

- Filter/search on client side
- AirBnB style guide

## Usage

- Start the server using `npm start or npm start-watch`
- Build for development using `npm run build-dev`
- Build for production using `npm run build`

```

```
