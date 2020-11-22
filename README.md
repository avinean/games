npm install
npm start

Run command `http-server` from dist directory in console
Open link http://127.0.0.1:8080 from browser or click on link in command console




Project stucture:

src/{project name}
    assets
        /images
        /audio
        /fonts
    scripts
        index.ts
        ...


COMMANDS:

Commands that should work automatically:
    build-res
    open
    watch

*project_name - project folder name

build resources for target project (e.g.> npm run build-res knife)
> npm run build-res project_name

open target project dist/index.html in browser (e.g.> npm run open knife)
> npm run open project_name

webpack watch for target project (e.g.> npm run watch knife)
> npm run watch project_name

create new project folders/files template (e.g.> npm run create test123)
> npm run create project_name


To simplify usage, please, add proj-specific command into package.json manually
e.g.

...
"knife": "npm run build-res knife && npm run watch knife",
...


ALIASES:

'@root' - root path for all projects
'@scripts': scripts root of current project
'@assets': assets (images, audio, fonts), usage - '@assets/images'
