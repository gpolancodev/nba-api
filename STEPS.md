# NBA API

# Parte 1 - Configurar entorno de desarrollo y estructura de proyecto

El proyecto trata de una REST API creada con Node.js, Express.js y TypeScript.

-   [Nodejs 18.9.0](https://nodejs.org/en/download/current/)
-   [Express.js 4.18.1](https://www.npmjs.com/package/express)
-   [Typescript 4.7.4](https://www.npmjs.com/package/typescript)
-   [npm 8.11.0](https://www.npmjs.com/)
-   VSCode 1.70.1

## 1. Configuración inicial del proyecto

-   Creamos una carpeta con el nombre del proyecto. En mi caso usare el nombre `nba-api`.

```bash
mkdir nba-api && cd nba-api
```

-   Inicializamos un proyecto de node.

```bash
npm init -y
```

-   Inicializamos un repositorio de git y creamos el `.gitignore`.

```bash
git init && touch .gitignore && echo node_modules > .gitignore
```

## 2. Instalación de dependencias

Puedes utilizar la configuración que quieras, en este coso usaremos `ts-standard` para lintear nuestro código y `ts-node-dev` para compilar nuestro código. Es una configuración efectiva y muy sencilla de inicializar.

**Dependencias de desarrollo**

```bash
npm install -ED typescript ts-node-dev @types/express dotenv
```

-   **typescript**: Usaremos typescript como lenguaje de programación

-   **[ts-node-dev](https://github.com/wclr/ts-node-dev#readme)**: Versión modificada de `node-dev` que usa `ts-node` por debajo. Reinicia el proceso del node cuando cambia cualquiera de los archivos requeridos (como nodemon), pero comparte el proceso de compilación de TypeScript entre reinicios.

-   **[@types/express](https://www.npmjs.com/package/@types/express)**: Tipos de Express.js para TypeScript.

**Dependencias de producción**

Por ahora la única dependencia de nuestro proyecto es `express`.

```bash
npm install -E express helmet cors
```

## 3. Estructura de proyecto

Todo nuestro código estará dentro de la carpeta `src`, a medida que avanza el tutorial, se irán creando más carpetas y archivos.

Por ahora trabajaremos en esta estructura básica.

```bash
|- nba-api
    |-- src
        |- index.ts
    |-- package.json
    |-- tsconfig.json
    |-- .gitignore
```

Más adelante crearemos carpetas y archivos para las **rutas**, **controladores**, **servicios** y **repositories**.

```bash
|- nba-api
    |-- tests
    |-- src
        |- controllers
        |- routes
        |- services
        |- index.ts
    |-- package.json
    |-- tsconfig.json
    |-- .gitignore
```

-   **routes**: Todas los endpoints de nuestra API. Por ejemplo `/api/teams` y `/api/players`. Las rutas son las encargadas de recibir la petición HTTP y llamar a los controladores.

-   **controllers**: Se encargan de recibir la petición HTTP y devolver una respuesta. También podemos poner en este punto toda la validación de los datos que recibimos.

-   **services**: Contienen nuestra lógica de negocio, en este caso es una API que más que nada va a mostrar datos, no hay persistencia de datos.

-   **repositories**: Contienen la lógica de acceso a datos. Por ejemplo, podemos crear un repositorio que se conecta a un base de datos y otro que se conecta con una API externa. De esta forma, en el servicio puedes decidir desde donde vienen tus datos. Si en el futuro, hay otra fuente de datos solo tenemos que modificar el servicio y crear una nueva implementación del repositorio.

## 4. Configuración de TypeScript

Para iniciar la configuración de TypeScript, usaremos el comando `tsc --init`, podemos usar el binario local `node_modules/.bin/tsc --init` o usando npx `npx tsc --init` para ejecutar el binario remoto.

Al ejecutar uno de estos comandos, generaremos un archivo `tsconfig.json` en la carpeta del proyecto. Por ahora las opciones que dejaremos activas son las siguientes:

```json
{
	"compilerOptions": {
		/* Language and Environment */
		"target": "es2016",

		/* Modules */
		"module": "commonjs",
		"rootDir": "src",

		"baseUrl": ".",
		"resolveJsonModule": true,

		/* Emit */
		"outDir": "build",

		/* Interop Constraints */
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,

		/* Type Checking */
		"strict": true,
		"noImplicitAny": true,
		"strictNullChecks": true,
		"noUnusedParameters": true,
		"noImplicitReturns": true,

		/* Completeness */
		"skipLibCheck": true
	}
}
```

**A destacar en esta configuración**

-   `target`: El lenguaje de programación que queremos usar. En este caso usaremos `es2016` (ES6).
-   `rootDir`: La carpeta raíz del proyecto. En este caso usaremos `src`.
-   `outDir`: La carpeta donde se generarán los archivos de salida. En este caso usaremos `build`.

Es la configuración básica que vamos a utilizar.

**Añadir script para la compilación de nuestro proyecto**
En nuestro `package.json`, añadimos un nuevo script para compilar nuestro proyecto.

```json
"scripts": {
  "build": "tsc",
}
```

Aún no tenemos nada que compilar, puede hacer la prueba creando el archivo `src/index.ts` Lanzas el script y verás la salida de la compilación en la carpeta `build`.

## 5. Configuración de eslint

Instalamos `eslint eslint-config-prettier prettier`

Para inicializar eslint utilizaremos el comando `npx eslint --init`.

## 6. Configurar ts-node-dev

-   https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way
-   https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

### END POINTS

-   https://github.com/kshvmdn/nba.js/blob/master/docs/api/DATA.md
    https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png
