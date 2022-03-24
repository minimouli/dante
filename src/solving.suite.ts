/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable, File } from '@minimouli/framework'
import Maze from './objects/Maze'

suite('Solving', () => {

    test('Empty', async () => {

        const exec = new Executable('solver', [
            File.fromMouli('/res/empty')
        ])

        await exec.execute()

        expect(exec).toExitWith(84)
    })

    test('Imperfect', async () => {

        const width = 100
        const height = 100

        const generation = File.fromMouli('/res/imperfect')

        const exec = new Executable('solver', [generation])

        const maze1 = new Maze(width, height)
        const maze2 = new Maze(width, height)

        const stream = await generation.openReadable()

        stream.pipe(maze1)
        exec.pipeStdout(maze2)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze1.createGraph()
        maze2.createGraph()

        maze1.checkToHaveSameStructureOf(maze2)

        maze2.checkSizeToBe(width, height)
        maze2.checkHasNoTrailingLine()
        maze2.checkToBeSolved()
    })

    test('Small', async () => {

        const width = 100
        const height = 100

        const generation = File.fromMouli('/res/small')

        const exec = new Executable('solver', [generation])

        const maze1 = new Maze(width, height)
        const maze2 = new Maze(width, height)

        const stream = await generation.openReadable()

        stream.pipe(maze1)
        exec.pipeStdout(maze2)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze1.createGraph()
        maze2.createGraph()

        maze1.checkToHaveSameStructureOf(maze2)

        maze2.checkSizeToBe(width, height)
        maze2.checkHasNoTrailingLine()
        maze2.checkToBeSolved()
    })

    test('Medium', async () => {

        const width = 1000
        const height = 1000

        const generation = File.fromMouli('/res/medium')

        const exec = new Executable('solver', [generation])

        const maze1 = new Maze(width, height)
        const maze2 = new Maze(width, height)

        const stream = await generation.openReadable()

        stream.pipe(maze1)
        exec.pipeStdout(maze2)

        await exec.execute()

        expect(exec).toExitWith(0)

        maze1.createGraph()
        maze2.createGraph()

        maze1.checkToHaveSameStructureOf(maze2)

        maze2.checkSizeToBe(width, height)
        maze2.checkHasNoTrailingLine()
        maze2.checkToBeSolved()
    })

    test('Large', async () => {

        const width = 3000
        const height = 3000

        const generation = File.fromMouli('/res/large')

        const exec = new Executable('solver', [generation])
        const maze = new Maze(width, height)

        exec.pipeStdout(maze)

        await exec.execute()

        expect(exec).toExitWith(0)

        // note: the checkToHaveSameStructureOf is disable due to memory issue
        maze.createGraph()
        maze.checkSizeToBe(width, height)
        maze.checkHasNoTrailingLine()
        maze.checkToBeSolved()
    })

})
