<img src="./images/banner.svg" width="100%" alt="">

# BreadMod

![GitHub Repo stars](https://img.shields.io/github/stars/BreadMod/scratch-gui?style=flat&logo=github&color=yellow)
![GitHub forks](https://img.shields.io/github/forks/BreadMod/scratch-gui?style=flat&logo=github)
![GitHub watchers](https://img.shields.io/github/watchers/BreadMod/scratch-gui?style=flat&logo=github&color=8A2BE2)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/BreadMod/scratch-gui/build.yml?style=flat&logo=github)

BreadMod is a Scratch mod that adds more customisability and blocks to Scratch. It is based on [TurboWarp](https://turbowarp.org/) but adds new features. Because of its core design, BreadMod can run Scratch projects but Scratch won't be able to run most BreadMod projects.

## Links
[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/BreadMod/scratch-gui)
[![Editor](https://img.shields.io/badge/Editor-orange?style=flat)
](https://breadmod.devstuf.dev)
[![Documentation](https://img.shields.io/badge/Documentation-blue?style=flat)
](https://docs.breadmod.devstuf.dev)

## Building
Assuming you have Node.js and npm installed, you can build BreadMod by running the following commands in your terminal:

```bash
git clone https://github.com/BreadMod/scratch-gui.git
cd scratch-gui
npm ci # We don't use npm install here.

# Running the development server
npm start

# Building for production
npm run build
```

## License
BreadMod's (and TurboWarp's) modifications to Scratch are licensed under the GNU General Public License v3.0. See LICENSE or [the GPL 3.0 license](https://www.gnu.org/licenses/gpl-3.0.html) for details.

The following is the original license for scratch-gui, which we are required to retain. This is NOT the license of this project.

```
Copyright (c) 2016, Massachusetts Institute of Technology
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```