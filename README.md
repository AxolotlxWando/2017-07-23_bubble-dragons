# 1 Bubble Dragons
Bubble Dragons: my personal home page at <http://www.bubble-dragons.com>.

Previously some redux, some apollo GraphQL demo plus a simple photo gallery on top and is now currently undergoing a cleanup process. The melbourne impressions/ western suburbs gallery project is moved into this with the realisation that it is indeed needed to have a single project, a home page to host all the demos and a playground for experiments that eliminates overheads for intitial setups for the case of multiple projects.

# 2 Bubble Dragons - Clean up project
## 2.1 Usage of boilerplate
The project uses the [apollo-universal-starter-kit](https://github.com/sysgears/apollo-universal-starter-kit) boilerplate.

Some special thoughts were needed for a proper setup that explictly map out the relationships between own project and the starter kit. I wrote about the setup in details on a standalone note called "Git - Strategies for Projects that Use Boilerplates," and tested it.

To summaries, the idea is to have clean history with 3 different types of works: starter kit/ the boilerplate, local modified, if any, to the boilerplate, and own project work, to maintain their own branch with own clean histories.

## 2.2 Problem
Right now the old project has everything on a a single, flattened timeline. It is really messy. And strange. I realised the problem when I found out I not only had the boilerplate's README.md on display to the public, I also have commits that trace back to the original boilerplate project people. I have essentially created a fork from version control's perspective and no, the project is in no way intended to be a boilerplate project.

## 2.3 Documenting current progress
So this readme documents a clean up process currently being worked on to adapt a better version control structure for projects that uses a starter kit. These trivial informations will surely not appear on the consequencely released versions but they may explain some potentially abnormal operations occuring on multiple branch as previous work are being put into new project and boilerplate branches.

It's serious work because it's not starting fresh but a migration project. Nothing was completely clear so I try to think it through upfront and plan the steps. Following will be the result as I document current progresses. It should not take long though: The project itself hadn't been around for that long... there is simply a total of only about 10 files that my project creates/ modifies anyway.

I had so many other subprojects and experiments I really wanted to do. Just need this to get this done so I can try them but having this migration project was totally worth it. I gained such a deeper understanding on practical version control concepts and workflow that I was unaware of before.

# 3 Clean up project - outline of a proposed version control strategy and structure for projects that use boilerplates or starter packs
This is a summary of what could have been done starting fresh in separating
original and local version of boilerplate and project work. The actual clean
up process is not this simple because all three types of works are in a single
flattened timeline right now.

- Add project remote

- Add boilerplate remote

- Create boilerplate-raw branch (orphan)

- Pull in boilerplate into boilerplate-raw from boilerplate remote - history
  for the boilerplate-raw branch will now base on the external boilerplate project

- Create master, perform a empty initial commit

- Creat development branch afer master

- Create local boilerplate branch to keep modifications from boilerplate
  contained. Do if from the development branch so history for boilerplate-local
  is based on own project (the empty intial commit)

- You decide where to add and commit changes. For project's modifications on
  boilerplate, do it in boilerplate-local branch. For own project code, do it
  in the development branch

- README.md for an example, it ships with the boilerplate and is considered
  part of the setup by the boilerplate project but interesetingly it is not
  considered so from own project's POV.

  The solution is to have a modification to remove it on the boilerplate-local
  branch and then create the own project's version in development.

- Pull boilerplate from boilerplate-raw into boilerplate-local. This will
  requires the --allow-unrelated-history flag

- Remove files that belongs to own projects in boilerplate-local and perform
  other tweaks on the stock boilerplate and commit them to boilerplate-local

- First time you pull boilerplate-local into development or master it should
  be relatively easy and straight forward since it will essentially be a fast
  forward

- Start adding project changes and commits

- The second time when you had updates from the boilerplate project you will
  fetch updates from boilerplate remote into boilerplate-raw branch

- Pull update from boilerplate-raw into boilerplate-local, again tweak and
  modify to accomodate own project's view and requirements.

- When pulling updated boilerplate into development or master this time, since
  new changes and new commits exists, although the development and boilerplate-local
  still have a common acestor going back somewhere, both of them are behind,
  whereboilerplate-local would be slightly more behind than development, a
  manual merge (not one with completely unrelated histories though) would be
  required.

# 4 Clean up prject - Process to reconstruct old project to use what is being outlined here
I tried a few different things while writing this but essentially there are
three tasks:
- Setting up the project structure outline above
- Identify prior modifications on the boilerplate
- Isolate identified boilerplate related work and commit them onto the
  boilerplate-local branch
- Recommit project work back in order to master and development branch

## 4.1 Setup
- git branch -m master master-old
- git checkout --orphan master
- git reset --hard, git checkout -f
- git commit --allow-empty -m "Initial commit"
- git checkout -b development
- git checkout --orphan boilerplate-raw
- git reset --hard, git checkout -f
- git set-ref \<boilerplate-remote's head\>
- git checkout -f development
- git checkout -b boilerplate-local
- git checkout \<found the exact commit or rough estimate that the old project
  was based on\> -- .
- git commit -m "Pull in intial copy of boilerplate for project use, version
  was based on <boilerplate commit hash>, latest version as of <commit date>"

## 4.2 Identify and isolate all differences
Three categories of changes to identify:
- Difference between current boilerplate version and old version used

  Being able to bump the boilerplate to later version is the whole point of
  having the outlined structure the way it is. But we should prioritise on
  having a clean history for project and contain boilerplate and boilerplate
  related modificaions contained in the local branch first and save this for
  another time.

- Modifications to boilerplate

  Previously changes were all flattened and contained in own project's history.
  Instead, modifications identified to be related to the boilerplate should be
  commited into this "intermediate" branch.

- Project related commits

  The reset of work will be considered project related, at this point we are
  not overly concerned with previous history's information. The master branch
  will start fresh and project work will simply be put back into the repository
  as new commits losely based on previous work's processes.

Actual work:
- git checkout boilerplate-local

- git diff boilerplate-raw

    This will give an idea of what updates on boilerplate are new, not too
    concerned with this right now.

- git diff --name-only master-old

    Giving the list of:
    ```
    .gitignore
    README.md
    README_STARTER_KIT.md
    app.json
    package.json
    src/client/app/nav_bar.jsx
    src/client/app/page_layout.jsx
    src/client/modules/counter/containers/counter.jsx
    src/client/modules/counter/index.jsx
    src/client/modules/index.js
    src/client/modules/post/containers/post_add.jsx
    src/client/modules/post/containers/post_edit.jsx
    src/client/modules/post/containers/post_list.jsx
    src/client/modules/western-suburbs/actions/index.js
    src/client/modules/western-suburbs/components/western-suburbs-show.jsx
    src/client/modules/western-suburbs/components/western-suburbs-show.web.jsx
    src/client/modules/western-suburbs/containers/western-suburbs.jsx
    src/client/modules/western-suburbs/containers/western-suburbs_int.spec.js
    src/client/modules/western-suburbs/graphql/western-suburbs.graphql
    src/client/modules/western-suburbs/index.jsx
    src/client/modules/western-suburbs/reducers/index.js
    src/common/redux_store.js
    src/server/api_server.js
    src/server/modules/connector.js
    src/server/modules/index.js
    src/server/modules/western-suburbs/index.js
    src/server/modules/western-suburbs/resolvers.js
    src/server/modules/western-suburbs/schema.graphqls
    src/server/modules/western-suburbs/sql.js
    src/server/modules/western-suburbs/western-suburbs_api_int.spec.js
    tools/webpack.app_config.js
    yarn.lock
    ```

    Project related:
        \<WIP, you are on master-tmp branch right now, I've commit this and
        pushed to github to reflect the update but I'm gone to sleep now\>

    Boilerplate related:
        \<WIP, you are on master-tmp branch right now, I've commit this and
        pushed to github to reflect the update but I'm gone to sleep now\>

## 4.3 Commit modifications on boilerplate-raw to boilerplate-local
After this happens, proper history and a explicit record of all modifications
to the boilerplate as own project requires it to be will be kept in boilerplate-local.

This is completed (the initial baseline to be specific, new requirements will cause
new modification to boilerplate-raw on boilerplate-local). A summary to what has
been done:

```
73f24862048c942afefe8194c6ec7f9f99c5309a Fix upload middleware and /uploads/ endpoint not getting mounted issue (moving to before website middleware)
c8bc033b3398cd98fff472fdac9b9d4b10c2f9bc Fix path to uploaded files at /uploads endpoint (public/uploads to public/assets/uploads)
8af4a35b812774585e7f9debc1db163c7908c55d Fix and improve logging messages in upload.js middleware
7c0f9d563e568bd68a529b51b3b31c495635eb13 Fix multer storage path in upload.js middleware (from assets/uploads to public/assets/uploads)
028044c2005322e3fbfe312f7684b253c5935bc4 Fix reference to common logging module in upload.js middleware
72e7d53b84aaef4f5b846bbaad9bb5c25dedfa19 Fix path to uploaded files (remove leading slash that made path absolute)
08a44e829427b9ff9255806dfd59964422fbaa02 Create upload middleware mounting at route /api/upload
5d90cf12d5f58a271a4946bef3e5c843dcc5fa79 Fix wrong gitignore entry - do track /assets/ folder, do not track /public/ folder
f85d5d0143d52a51c9be54ccc3a3ba4104ef35da Bump up installed packages' version, yarn.lock (2017-08-30)
e52a761ad12b6dae6c61e5589f2d3a7112937911 Refactor redux_store.js for readability and add redux-thunk middleware to createReduxStore()
42d1b1bb01259056496139374a6ee49306f49e4e Remove counter module from root route and move it to it's own route with it's own nav item (project has to fill the absent component for the default route /)
4b5fd35ab1b43d48a5ab88564036caffe599e699 Fix missing comma in container propTypes check in page_layout.jsx
3e887f18f356185227f3deffe7e548938659fd3d Add feature to conditionally check and display coresponding copyright notice in foodbar for project pages and stock examples (to page_layout.jsx, counter.jsx, post_add.jsx, post_edit.jsx, post_list.jsx)
3efff8b1c885e3c7c3efc5c216f7983a84106860 Modify page title in nav_bar.jsx to reflect project name
64dfe984420b2966dcddb69b408b793c4dafd75a Update webpack.app_config to include multer only in server bundles
7b9e0da5882ec18edab71c49b932a04b2a21528c Update package.json dependencies to include redux-thunk (file-upload, network and middleware related)
ae835ed060de6920d3cbe0738c54780313b27d97 Update package.json dependencies to include multer (file-upload related)
0e267e9967fc65df8f39f180dee2385274fa8032 Update package.json dependencies to include mime-types (file-upload related)
9b50add317431cc80600918eb74781e6ab41694e Update .gitignore to ignore the assets folder
306afa4d4eec9f0e79629f6d4ab93eff10bad529 Remove project related file README.md from starter kit
8942d50d992043e761483de1ed9323e274866314 Pull in intial copy of boilerplate for project use, version was based on d8510d01aa1df8e4172746ff6d5755636508c9fa, latest version as of 2017 July 22nd"
74534708fe713d89b7f634eac911ef3ff19490be Initial commit
```

## 4.4 Recommiting project work back to master
And project history will contain only project related work.

This is tested on the development branch in one big commit. No effort is likely
going to be invested to maintain a more granular history.

# 5 Clean up project - Moving on to usual project development process
Original goals are met now, moving on to improving photo gallery, uploads feature
and experiments wanting to do such as screen sizes and page layout, pixels editor.
