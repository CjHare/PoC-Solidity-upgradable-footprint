import {run} from 'hardhat'
import {log} from '../config/logging'
import {
    SlimUpgradableFootprint,
    StandardFootprint,
    UpgradableFootprint
} from '../typechain-types'
import {deployContract} from '../test/framework/contracts'

async function main() {
    await run('compile')

    const standard = await deployContract<StandardFootprint>(
        'StandardFootprint'
    )
    log.info(`Deployed StandardFootprint @ ${standard.address}`)

    const upgradable = await deployContract<UpgradableFootprint>(
        'UpgradableFootprint'
    )
    await upgradable.initialize()
    log.info(`Deployed StandardFootprint @ ${upgradable.address}`)

    const slimUpgradable = await deployContract<SlimUpgradableFootprint>(
        'SlimUpgradableFootprint'
    )
    await slimUpgradable.initialize()
    log.info(`Deployed SlimUpgradableFootprint @ ${slimUpgradable.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        log.error(error)
        process.exit(1)
    })
