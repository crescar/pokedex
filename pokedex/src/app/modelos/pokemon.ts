export interface pokemon {
    nombre: string,
    habilidades: Array<string>,
    imagen: string,
    altura: number,
    peso: number,
    type: Array<string>,
    movimientos: Array<string>,
    estadisticas: Array<{
        nombre:string,
        esfuerzo:number,
        base_estadistica:string
    }>
}