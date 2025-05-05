import cron from 'node-cron'
import { Resend } from 'resend'
import { prismaDB } from '@main/infra/db'
import logger from '@main/tools/logger'

const resend = new Resend(process.env.RESEND_API_KEY)

// 0 8 * * * -> todo dia 8 hrs
cron.schedule('0 8 * * *', async () => {
    logger.info('Verificando filmes com estreia hoje...')
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    const filmesEstreando = await prismaDB.filme.findMany({
        where: {
            dtLancamento: {
                gte: hoje,
                lt: amanha,
            },
        },
        include: {
            usuario: true,
        },
    })

    for (const filme of filmesEstreando) {
        await resend.emails.send({
            from: 'Filmes App <devlari.online>',
            to: `${filme.usuario.email}`,
            subject: `🎬 Seu filme "${filme.tituloTraduzido}" estreia hoje!`,
            html: `<h1>${filme.tituloTraduzido}</h1><p>Hoje é o grande dia da estreia! 🎉</p>`,
        });

        logger.info(`Email enviado para ${filme.usuario.email} sobre "${filme.tituloTraduzido}"`)
    }
})
