import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TestNodeContainerComponent extends Component {
    @tracked data;
    @tracked selectedNode = null;

    @action
    detailToggled(nodeId) {
        console.log('detail toggled for node ' + nodeId);
        this.selectedNode = this.data[nodeId];
    }
}
