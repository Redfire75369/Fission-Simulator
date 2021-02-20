# Beginner's Guide to GitHub
## Forking the Repository
In order for you to make edits, you will have to fork this repository to your GitHub Account
1. Go to the [repository on GitHub](https://github.com/Redfire75369/Fission-Simulator)
2. Login to your github account
3. Click the `Fork` button in the top right corner of the page

## Locating Forked Repository
You can now find a new repository called "Fission-Simulator" when checking your profile page/repositories.
Alternatively, you can go to `https://www.github.com/<username>/Fission-Simulator`.

## Using the Online Editor
1. Locate the file by using Github's `Find Files` or other methods
2. Click on it to open it in the Github file view
3. Click on the pen icon to open the editor
4. The editor will allow you to modify the file as you wish
5. Make edits to the files
6. Add a title and description of your changes in the commit changes section (bottom of page)
7. Commit by clicking on `Commit changes`

## Cloning the Forked Repository
1. Create a folder on your local computer where you want the repository to be cloned to.
2. Open Command Prompt/Powershell(Windows) or Terminal(Mac/Linux) in that folder.
3. Navigate to your repository and click on `Code`
4. Copy the HTTPS link
5. Run `git clone <HTTPS Link>`
6. Navigate to the repository and test that it was properly set up with `git status`

## Creating Commits on the Local Repository
**Note: This is assuming you have already made the changes that you want via a text editor of your choice.**
1. Navigate to the local repository
2. Run `git add -A` in the folder
3. Run `git status` to check that the files were properly staged
4. Run `git commit -m "Message"` where `Message` is the title of your commit

## Pushing Commits from Local to Remote Repository
1. Run `git push` in the local repository's folder
2. Enter your github account credentials (**This is not a breach of your account's security**)
3. Navigate to your repository and check the commit list that it was properly pushed

## Creating a Pull Request
1. Go to [Make a New Pull Request](https://github.com/Redfire75369/Fission-Simulator/compare)
2. Click on `compare across forks`
3. Select the branch that you are contributing to as the `base` branch, and the branch you have edited as the `head` branch
4. Click on `Create Pull Request`
5. Write a short name and description for the pull Request
6. Click on `Create Pull Request`
