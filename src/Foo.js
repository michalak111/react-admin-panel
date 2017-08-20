import React from 'react'
import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';

const Foo = () => (
    <Card>
        <ViewTitle title="Foo" />
        <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate lorem quis laoreet imperdiet. Integer dictum ultricies luctus. Nulla vel vulputate justo. Praesent sit amet tortor nulla. Cras efficitur molestie ipsum vel sagittis. Nulla facilisi. Morbi consequat, est sed tincidunt mattis, quam ante tincidunt purus, ac efficitur lacus ipsum ac nisi. Pellentesque dignissim justo ut eros ullamcorper auctor. Vestibulum auctor rutrum mi, et tempus nunc interdum non. Vestibulum felis ipsum, tincidunt blandit metus sed, iaculis bibendum massa. Sed ultrices ultrices posuere.
        </CardText>
        <CardText>
            Cras non justo urna. Curabitur scelerisque sapien in est fringilla, id porta nisi blandit. Nulla tempus consectetur massa id dignissim. Duis ut augue est. Aliquam fringilla posuere fringilla. Phasellus scelerisque posuere facilisis. Nullam felis nisi, vestibulum in tristique sed, vehicula non enim. Nunc tristique quam leo, eu porta risus placerat eu. Integer in lectus ut lacus posuere maximus et vel mauris. Nullam rutrum ipsum in arcu pulvinar luctus. Nulla porttitor ex libero, a bibendum nunc maximus a. Etiam in congue arcu. Sed nec malesuada nisl. Cras ut molestie erat, et porta ante. Fusce ipsum ante, accumsan vitae ornare non, iaculis nec ipsum. Proin auctor convallis vestibulum.
        </CardText>
    </Card>
);

export default Foo;