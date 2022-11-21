import {ref} from "vue";

export class Authority {
    public static readonly Visitor = 0
    public static readonly Student = 1
    public static readonly Admin = 2
}

export let authority = ref(Authority.Visitor)