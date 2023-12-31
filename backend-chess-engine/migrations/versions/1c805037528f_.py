"""empty message

Revision ID: 1c805037528f
Revises: 
Create Date: 2023-08-10 11:40:30.993386

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c805037528f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('game',
    sa.Column('game_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('opening', sa.String(), nullable=True),
    sa.Column('fen', sa.String(), nullable=True),
    sa.Column('game_status', sa.String(), nullable=True),
    sa.Column('user_move_list', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('engine_move_list', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('white', sa.String(), nullable=True),
    sa.Column('user_move', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('game_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('game')
    # ### end Alembic commands ###
