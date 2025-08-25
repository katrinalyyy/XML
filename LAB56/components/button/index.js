export class ButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        
            this.parent.insertAdjacentHTML('beforeend', '<button type="button" class="btnbtn"></button>');
        
        }
}