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

## 4.4 Recommiting project work back to master
And project history will contain only project related work.

