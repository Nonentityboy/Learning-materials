# Git流程梳理与理解 

## Git的四个区域
* 工作区 
  本地电脑存放项目文件的地方，比如learnGitProject文件夹； 
* 暂存区（Index/Stage） 
  在使用git管理项目文件的时候，其本地的项目文件会多出一个.git的文件夹，将这个.git文件夹称之为版本库。其中.git文件夹中包含了两个部分，一个是暂存区（Index或者Stage）,顾名思义就是暂时存放文件的地方，通常使用`git add`命令将工作区的文件添加到`暂存区`里； 
* 本地仓库 
  .git文件夹里还包括git自动创建的master分支，并且将HEAD指针指向master分支。使用`git commit`可以将暂存区中的文件添加到本地仓库中； 
* 远程仓库 
  不是在本地仓库中，项目代码在远程git服务器上，比如项目放在github上，就是一个远程仓库，通常使用clone命令将远程仓库拷贝到本地仓库中，开发后推送到远程仓库中即可

## GIT常用操作命令

### 工作区上的操作命令
* 新建仓库
  
   * （1）将工作区中的项目文件使用git进行管理，即创建一个新的本地仓库：git init；

   * （2）从远程git仓库复制项目：`git clone <url>`
    克隆项目时如果想定义新的项目名，可以在clone命令后指定新的项目名：`git clone git://github.com/nonentityboy/example.git mygit`

* 提交
  
   * （1）提交工作区所有文件到暂存区
    `git add .`

   * （2）提交工作区中指定文件到暂存区
   `git add <file1> <file2> ...`

   * （3）提交工作区中某个文件夹中所有文件到暂存区
    `git add [dir]`

* 撤销

   * （1）删除工作区文件，并且也从暂存区删除对应文件的记录
    `git rm <file1> <file2>`

   * （2）从暂存区中删除文件，但是工作区依然还有该文件
    `git rm --cached <file>`

   * （3）取消暂存区已经暂存的文件
    `git reset HEAD <file>...`
    
   * （4）撤销上一次对文件的操作
    `git checkout --<file>`
    要确定上一次对文件的修改不再需要，如果想保留上一次的修改以备以后继续工作，可以使用stashing和分支来处理

	更新文件

		重命名文件，并将已改名文件提交到暂存区
			`git mv [file-original] [file-renamed]`
            
	查新信息

		（1）查询当前工作区所有文件的状态
			git status
		（2）比较工作区中当前文件和暂存区之间的差异，也就是修改之后还没有暂存的内容：git diff；指定文件在工作区和暂存区上差异比较
			git diff <file-name>


### 暂存区上的操作命令
* 提交文件到版本库
  
  * （1）将暂存区中的文件提交到本地仓库中，即打上新版本
			`git commit -m "commit_info"`
  * （2）将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程
			`git commit -a -m "commit_info"`
  * （3）提交文件时，发现漏掉几个文件，或者注释写错了，可以撤销上一次提交
			`git commit --amend`


* 查看信息

  * （1）比较暂存区与上一版本的差异
			`git diff --cached`
  * （2）指定文件在暂存区和本地仓库的不同
			`git diff <file-name> --cached`
  * （3）查看提交历史
			`git log`；参数-p展开每次提交的内容差异，用-2显示最近的两次更新，如`git log -p -2`;


* 分支管理
  
	* 创建与合并分支
			（1）查看分支
				git branch
			（2）创建分支
				git branch <name>
			（3）切换分支
				git checkout <name>
			（4）创建+切换分支
				git checkout -b <name>
			（5）合并某分支到当前分支
				git merge <name>
			（6）删除分支
				git branch -d <name>

	* 解决冲突
			当`一个分支与另一个分支`有冲突时，如使用merge语句进行合并，那么则需要手动解决冲突，git status也可以告诉我们冲突的文件，Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后提交：$ git add readme.txt 
$ git commit -m "conflict fixed"，最后，删除feature1分支：$ git branch -d feature1
				
   * BUG分支
			修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
			当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。
		Feature分支
			开发一个新feature，最好新建一个分支；
			如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

  * 多人协作
			（1）首先，可以试图用git push origin <branch-name>推送自己的修改；
			（2）如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
			（3）如果合并有冲突，则解决冲突，并在本地提交；
			（4）没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！
			如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
* 小结
  
    查看远程库信息，使用git remote -v；
    本地新建的分支如果不推送到远程，对其他人就是不可见的；
    从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
    在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
    建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
    从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。
			示例
				【成员一： 初始仓库操作】
					
				【成员一： 建立dev分支操作】
					
				【成员二：改动dev分支操作】
					
				【成员一：之后再改动dev分支】
					
	复杂分支操作
		（1）把远程分支合并到当前分支
			git merge <remote-name>/<branch-name>，如git merge origin/serverfix；
			如果是单线的历史分支不存在任何需要解决的分歧，只是简单的将HEAD指针前移，所以这种合并过程可以称为快进（Fast forward），而如果是历史分支是分叉的，会以当前分叉的两个分支作为两个祖先，创建新的提交对象；如果在合并分支时，遇到合并冲突需要人工解决后，再才能提交；
		（2）在远程分支的基础上创建新的本地分支
			git checkout -b <branch-name> <remote-name>/<branch-name>，如git checkout -b serverfix origin/serverfix;
		（3）从远程分支checkout出来的本地分支，称之为跟踪分支。
			在跟踪分支上向远程分支上推送内容：git push。该命令会自动判断应该向远程仓库中的哪个分支推送数据
			在跟踪分支上合并远程分支：git pull
		（4）将一个分支里提交的改变移到基底分支上重放一遍
			git rebase <rebase-branch> <branch-name>，如git rebase master server；将特性分支server提交的改变在基底分支master上重演一遍；使用rebase操作最大的好处是像在单个分支上操作的，提交的修改历史也是一根线；
			如果想把基于一个特性分支上的另一个特性分支变基到其他分支上，可以使用--onto操作：git rebase --onto <rebase-branch> <feature branch> <sub-feature-branch>，如git rebase --onto master server client；
			使用rebase操作应该遵循的原则是：一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行rebase操作；


### 本地仓库上的操作
* 查看本地仓库关联的远程仓库
		git remote -v
		在克隆完每个远程仓库后，远程仓库默认为origin;加上-v的参数后，会显示远程仓库的url地址；

* 为本地仓库添加远程关联仓库，一般会取一个简短的别名
		git remote add [remote-name] [url]，比如：git remote add example git://github.com/example/example.git;
			 不过一般都起 origin
		了便于管理，Git要求每个远程主机都必须指定一个主机名。git remote命令就用于管理主机名。

* 将本地仓库某分支推送到远程仓库上
		git push [remote-name] [branch-name]，如git push origin master
			git push -u origin master第一次从本地仓库推送空的远程仓库时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
		如果想将本地分支推送到远程仓库的不同名分支
			git push <remote-name> <local-branch>:<remote-branch>，如git push origin serverfix:awesomebranch
		如果想删除远程分支
			git push [romote-name] :<remote-branch>，如git push origin :serverfix。这里省略了本地分支，也就相当于将空白内容推送给远程分支，就等于删掉了远程分支。

* 从远程仓库中抓取本地仓库中没有的更新
		git fetch [remote-name]，如git fetch origin
		使用fetch只是将远端数据拉到本地仓库，并不自动合并到当前工作分支，只能人工合并。（只更新了commit id，git fetch命令通常用来查看其他人的进程，因为它取回的代码对你本地的开发代码没有影响。）如果设置了某个分支关联到远程仓库的某个分支的话，可以使用git pull来拉去远程分支的数据，然后将远端分支自动合并到本地仓库中的当前分支；
	查看远程仓库的详细信息
		git remote show origin

* 版本回退
		在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
			git reset --hard HEAD^
		回到未来
			 git reset --hard 1094a （可使用git reflog来查看commit ID）

### 忽略文件.gitignore

	一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。
		