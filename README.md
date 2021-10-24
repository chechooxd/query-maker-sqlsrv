# Query Maker SQL Server

Con el fin desarrollar una aplicacion capas de realizar querys sql de marena personalizada, se creo esta herramienta, la cual consiste en un algoritmo que desarrolla la query en base a objetos y Arrays.

## Instalacion

puedes instalarlo desde npm 

`$ mpm install query-maker-sqlserv`

## Como se usa

para la creacion de una query es obligacion otorgar un nombre de una tabla, de no se asi la aplicacion no sera capas de crear dicha query

### Creacion de select 

```[JS]
const queryMaker = require('query-maker-sqlserv')

const options = {
    tabla: 'customers'
}

const query =  queryMaker.createSelect(options)

console.log(query)

result 

'select * from customers'

```

### Creacion de select con columnas

```[JS]
const queryMaker = require('query-maker-sqlserv')

const columns = [
    {
        name: 'customerId',
        asigName: 'Id'
    },
    {
        name: 'customerName',
        asigName: 'Name'
    }
]

const options = {
    tabla: 'customers',
    columns: columns
}

const query =  queryMaker.createSelect(options)

console.log(query)

result:

'select customerId as Id, customerName as Name from customers'

```

### Creacion de select con condiciones

```[JS]
const queryMaker = require('query-maker-sqlserv')

const options = {
    tabla: 'customers'
}

const conditions = [
    
]

const query =  queryMaker.createSelect(options)

console.log(query)

result 

'select * from customers'

```


